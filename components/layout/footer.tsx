export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/20">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🗾</div>
              <span className="text-xl font-bold text-foreground">Kawaii Map</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Plan your perfect Japan trip with our cute and interactive travel map. Discover amazing spots, create
              itineraries, and explore Japan like never before!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                🐦 Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📷 Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/map" className="text-muted-foreground hover:text-primary transition-colors">
                  Interactive Map
                </a>
              </li>
              <li>
                <a href="/trip" className="text-muted-foreground hover:text-primary transition-colors">
                  Trip Planner
                </a>
              </li>
              <li>
                <a href="/spots" className="text-muted-foreground hover:text-primary transition-colors">
                  Popular Spots
                </a>
              </li>
              <li>
                <a href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Model Courses
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2024 Kawaii Map. Made with ❤️ for Japan travelers worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
