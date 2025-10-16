import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Full Stack Developer at Google",
    content: "GigLabs transformed my career. The hands-on projects and gamified learning made complex concepts easy to grasp. Now I'm working at my dream company!",
    avatar: "SJ",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "UI/UX Designer at Apple",
    content: "The internship program here is incredible. Real projects, expert mentors, and a supportive community. I landed my job at Apple within 2 months of completing the course!",
    avatar: "MC",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Backend Engineer at Amazon",
    content: "Best investment in my career. The gamification aspect kept me motivated, and the certifications are recognized by top companies. Highly recommend!",
    avatar: "PS",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our students who transformed their careers with GigLabs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
