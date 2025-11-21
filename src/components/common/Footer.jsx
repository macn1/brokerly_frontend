export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-amber-400">Stacker Bee</h3>
            <p className="text-sm text-slate-400">
              Premium hospitality and accommodations for your perfect getaway.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-amber-400">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="/" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Home
              </a>
              <a href="/apartments" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Apartments
              </a>
              <a href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-amber-400">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <p>Email: info@stackerbee.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: Dwarka mor Delhi</p>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333H16V2.169c-.585-.089-1.308-.169-2.227-.169-2.753 0-4.773 1.653-4.773 4.692V8z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row gap-4 text-xs text-slate-500 md:items-center">
              <p>&copy; {currentYear} Stacker Bee. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
