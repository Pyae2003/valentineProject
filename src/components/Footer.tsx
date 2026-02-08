import Link from "next/link";
import { Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-20 bg-gradient-to-t from-pink-100 via-pink-50 to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP TEXT */}
        <div className="text-center mb-10">
          <p className="text-pink-600 text-lg font-semibold">
            Made with love 💖
          </p>
          <p className="text-sm text-pink-400 mt-1">
            A small place to keep our memories forever
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-pink-600">

          {/* DEVELOPER */}
          <div className="space-y-2">
            <h4 className="font-semibold text-pink-700">👩‍💻 Developer</h4>
            <p>PYAE KHANT</p>
            <p className="text-pink-400">
              Full-Stack Developer
            </p>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <h4 className="font-semibold text-pink-700">📧 Email</h4>
            <Link
              href="mailto:your-email@example.com"
              className="flex items-center gap-2 hover:text-pink-800 transition"
            >
              <Mail className="w-4 h-4" />
               pyaekhant20sh32te47@gmail.com
            </Link>
          </div>

          {/* CONTACT */}
          <div className="space-y-2">
            <h4 className="font-semibold text-pink-700">📞 Contact</h4>
            <Link
              href="tel:+959000000000"
              className="flex items-center gap-2 hover:text-pink-800 transition"
            >
              <Phone className="w-4 h-4" />
              +95 9 892 459 049
            </Link>
          </div>

          {/* PERSONALITY */}
          <div className="space-y-2">
            <h4 className="font-semibold text-pink-700">💖 Personality</h4>
            <p className="text-pink-500 leading-relaxed">
              Romantic • Calm • Caring <br />
              Loves coding & creating memories
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-pink-200 text-center text-xs text-pink-400">
          <div className="flex justify-center items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <Heart className="w-3 h-3 text-pink-400" />
            <span>For Our Love</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
