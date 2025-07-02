import { Zap, ChefHat, Heart, Star, Clock, Shield } from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Average delivery time of just 15 minutes. Your food arrives hot and fresh, exactly when you need it.",
      stats: "15 min avg",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: ChefHat,
      title: "Premium Quality",
      description:
        "Partnered with top-rated restaurants and chefs to ensure every meal meets our high standards.",
      stats: "5-star rated",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Customer Love",
      description:
        "24/7 support and a satisfaction guarantee. We're not happy until you're completely satisfied.",
      stats: "99% satisfied",
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-orange-100">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
            Why Choose FoodieExpress?
          </h2>

          <p className="text-xl text-orange-100/90 max-w-3xl mx-auto leading-relaxed">
            We're not just a food delivery service - we're your culinary
            adventure partner, bringing restaurant-quality meals to your
            doorstep with unmatched speed and care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-full h-full bg-gray-900/80 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Stats badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                      {feature.stats}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-orange-100/80 leading-relaxed group-hover:text-orange-100 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Available 24/7</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">100% Secure</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">Trusted by 10k+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
