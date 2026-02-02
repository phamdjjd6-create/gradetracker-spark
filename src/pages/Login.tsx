import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FptLogo } from "@/components/FptLogo";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // Try login with email first
      let email = form.identifier;
      
      // If not an email, look up email by username
      if (!form.identifier.includes("@")) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", form.identifier)
          .single();
        
        if (!profile) throw new Error("Không tìm thấy tài khoản");
        email = profile.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: form.password,
      });

      if (error) throw error;

      toast({ title: "Đăng nhập thành công!" });
      navigate("/app");
    } catch (error: any) {
      toast({
        title: "Lỗi đăng nhập",
        description: error.message || "Email/Username hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center"><FptLogo size={64} /></div>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>Đăng nhập để truy cập GPA Calculator</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Username hoặc Email</Label>
              <Input id="identifier" className="input-gpa" placeholder="username hoặc email" value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} className="input-gpa pr-10" placeholder="••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full btn-primary-gradient" disabled={isLoading}>
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Đang đăng nhập...</> : "Đăng nhập"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Chưa có tài khoản? <Link to="/register" className="text-primary font-medium hover:underline">Đăng ký ngay</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
