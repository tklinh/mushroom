import { useState } from "react"
import { ShoppingCart, Menu, Leaf, Truck, Award, Clock, Star, X } from "lucide-react"

export default function MushroomWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [email, setEmail] = useState("")

  // Products data
  const products = [
    {
      id: 1,
      name: "Shiitake Mushrooms",
      description: "Premium fresh shiitake with rich, earthy flavor",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Oyster Mushrooms",
      description: "Delicate and mild, perfect for stir-fries",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Portobello Caps",
      description: "Large, meaty caps ideal for grilling",
      price: 15.99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Mixed Variety Pack",
      description: "Assorted mushrooms for diverse cooking",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Recipes data
  const recipes = [
    {
      id: 1,
      name: "Creamy Mushroom Risotto",
      description: "Rich and creamy risotto with mixed mushrooms",
      cookTime: "35 min",
      rating: "4.8",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Grilled Portobello Burger",
      description: "Healthy vegetarian burger alternative",
      cookTime: "20 min",
      rating: "4.6",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Mushroom Soup",
      description: "Hearty soup with fresh herbs and cream",
      cookTime: "25 min",
      rating: "4.9",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const addToCart = (product: any) => {
    setCartCount((prev) => prev + 1)
    console.log("Added to cart:", product.name)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl">🍄</span>
                <span className="ml-2 text-xl font-bold text-green-800">MushroomWorld</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#home"
                  className="text-green-800 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#products"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </a>
                <a
                  href="#recipes"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recipes
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
                <a
                  href="/md2"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  MD2
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-green-600">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-700">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-green-800 font-medium">
                Home
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                About
              </a>
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Products
              </a>
              <a href="#recipes" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Recipes
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                Contact
              </a>
              <a href="/md2" className="block px-3 py-2 text-gray-700 hover:text-green-600">
                MD2
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">Discover the Magic of Mushrooms</h1>
              <p className="text-xl text-gray-700 mb-8">
                From farm-fresh varieties to gourmet recipes, explore the wonderful world of mushrooms with us. Premium
                quality, sustainable farming, and delicious possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Fresh mushrooms"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <p className="font-semibold text-green-800">100% Organic</p>
                    <p className="text-sm text-gray-600">Farm Fresh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Mushrooms?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {
                "We're passionate about bringing you the finest mushrooms, grown with care and harvested at peak freshness."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organic & Natural</h3>
              <p className="text-gray-600">
                Grown without harmful chemicals or pesticides, ensuring pure and natural flavors.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Delivery</h3>
              <p className="text-gray-600">Farm-to-table freshness with same-day harvesting and quick delivery.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-selected varieties known for their exceptional taste and nutritional value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
            <p className="text-xl text-gray-600">
              Discover our carefully curated selection of fresh and dried mushrooms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Delicious Mushroom Recipes</h2>
            <p className="text-xl text-gray-600">Transform your meals with these amazing mushroom recipes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{recipe.cookTime}</span>
                    <Star className="h-4 w-4 text-yellow-400 ml-4 mr-1" />
                    <span className="text-sm text-gray-500">{recipe.rating}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                  <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                    View Recipe →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Get the latest recipes, growing tips, and special offers delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl">🍄</span>
                <span className="ml-2 text-xl font-bold">MushroomWorld</span>
              </div>
              <p className="text-gray-400">Your trusted source for premium mushrooms and culinary inspiration.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fresh Mushrooms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dried Mushrooms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mushroom Kits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Specialty Items
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Growing Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Nutrition Facts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@mushroomworld.com</li>
                <li>📞 (555) 123-4567</li>
                <li>📍 123 Farm Road, Green Valley</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MushroomWorld. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
