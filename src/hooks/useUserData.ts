import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserDataJson, createDefaultUserData } from "@/types/gpa";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useUserData() {
  const [data, setData] = useState<UserDataJson>(createDefaultUserData());
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const { toast } = useToast();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDataRef = useRef<UserDataJson | null>(null);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: userData, error } = await supabase
        .from("user_data")
        .select("data_json")
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No data found, use default
          setData(createDefaultUserData());
        } else {
          throw error;
        }
      } else if (userData?.data_json) {
        // Merge with defaults to ensure all fields exist
        const savedData = userData.data_json as unknown as Partial<UserDataJson>;
        setData({ ...createDefaultUserData(), ...savedData });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (dataToSave: UserDataJson) => {
    try {
      setSaveStatus("saving");
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_data")
        .upsert({
          user_id: user.id,
          data_json: dataToSave as unknown as Json,
        }, {
          onConflict: "user_id",
        });

      if (error) throw error;
      
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving user data:", error);
      setSaveStatus("error");
      toast({
        title: "Lỗi lưu dữ liệu",
        description: "Không thể lưu dữ liệu. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  // Debounced update with auto-save
  const updateData = useCallback((updater: (prev: UserDataJson) => UserDataJson) => {
    setData((prev) => {
      const newData = updater(prev);
      pendingDataRef.current = newData;

      // Clear existing debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new debounce
      debounceRef.current = setTimeout(() => {
        if (pendingDataRef.current) {
          saveUserData(pendingDataRef.current);
        }
      }, 800);

      return newData;
    });
  }, []);

  // Force save now
  const saveNow = useCallback(async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    await saveUserData(data);
  }, [data]);

  // Reset data
  const resetData = useCallback(async () => {
    const defaultData = createDefaultUserData();
    setData(defaultData);
    await saveUserData(defaultData);
    toast({
      title: "Đã đặt lại",
      description: "Dữ liệu đã được đặt lại về mặc định.",
    });
  }, [toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    data,
    isLoading,
    saveStatus,
    updateData,
    saveNow,
    resetData,
    refetch: fetchUserData,
  };
}
