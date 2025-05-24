import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-trust-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Starlink For All</h3>
            <p className="text-blue-100">
              Bringing high-speed internet to rural Bangladesh through micro-investments.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-blue-100 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-100 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-blue-100 hover:text-white">
                  Investor Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-blue-100 mb-2">Email: info@starlinkforall.bd</p>
            <p className="text-blue-100">Phone: +880 1XXX-XXXXXX</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-700 text-center text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Starlink For All. All rights reserved.</p>
          <p className="mt-2">
            <Link href="#" className="text-blue-200 hover:text-white">Privacy Policy</Link>
            {' '} | {' '}
            <Link href="#" className="text-blue-200 hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}