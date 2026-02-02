import { Link } from "react-router-dom";
import { FptLogo } from "@/components/FptLogo";
import { Button } from "@/components/ui/button";
import { Calculator, Target, BookOpen, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <FptLogo size={80} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">GPA Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Track • Calculate • Plan</p>
            <p className="text-lg text-muted-foreground mb-8">
              Công cụ tính GPA thông minh cho sinh viên FPT và các trường đại học khác
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-gradient text-lg px-8" asChild>
                <Link to="/register">Bắt đầu ngay</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/login">Đăng nhập</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Calculator, title: "Điểm TB Môn", desc: "Tính điểm trung bình môn theo trọng số" },
            { icon: BookOpen, title: "GPA Học Kỳ", desc: "Tính GPA từng kỳ với hoặc không tín chỉ" },
            { icon: TrendingUp, title: "GPA Tích Lũy", desc: "Theo dõi GPA toàn khóa học" },
            { icon: Target, title: "Kế Hoạch GPA", desc: "Lập kế hoạch đạt GPA mục tiêu" },
          ].map((f, i) => (
            <div key={i} className="card-elevated card-hover p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>© 2024 GPA Calculator for FPT University</p>
      </footer>
    </div>
  );
};

export default Index;
