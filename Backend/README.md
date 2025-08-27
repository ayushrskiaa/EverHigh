# BLUORNG Backend - Node.js API

A complete Node.js backend API for the BLUORNG e-commerce platform, providing all necessary endpoints for the frontend application.

## Features

- 🛍️ **Complete E-commerce API**
  - Product management with filtering and search
  - Shopping cart functionality
  - Order management
  - User authentication and profiles
  - Store locations

- 🔒 **Security Features**
  - Input validation
  - Rate limiting
  - CORS protection
  - Helmet security headers

- 📊 **Data Management**
  - JSON-based data storage (demo)
  - RESTful API design
  - Comprehensive error handling

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting
- **Compression** - Response compression

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at [http://localhost:5000](http://localhost:5000)

### Production

```bash
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/featured` - Get featured products
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/search/:query` - Search products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/categories/slug/:slug` - Get category by slug

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get single store
- `GET /api/stores/city/:city` - Get stores by city

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `PUT /api/cart/:userId/update/:itemId` - Update cart item
- `DELETE /api/cart/:userId/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/:userId/clear` - Clear cart
- `GET /api/cart/:userId/count` - Get cart count

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/:userId/:orderId` - Get specific order
- `POST /api/orders/:userId/create` - Create new order
- `PUT /api/orders/:userId/:orderId/status` - Update order status
- `DELETE /api/orders/:userId/:orderId` - Cancel order
- `GET /api/orders/:userId/tracking/:orderId` - Get tracking info

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/addresses` - Get user addresses
- `POST /api/users/:id/addresses` - Add address
- `PUT /api/users/:id/addresses/:addressId` - Update address
- `DELETE /api/users/:id/addresses/:addressId` - Delete address
- `GET /api/users/:id/wishlist` - Get wishlist
- `POST /api/users/:id/wishlist` - Add to wishlist
- `DELETE /api/users/:id/wishlist/:productId` - Remove from wishlist

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Health Check
- `GET /api/health` - API health status

## Data Structure

### Products
```json
{
  "id": 1,
  "name": "BLACK CORAL HEIST T-SHIRT",
  "price": 4495,
  "originalPrice": 4495,
  "category": "t-shirts",
  "image": "image_url",
  "images": ["image_urls"],
  "description": "Product description",
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["Black"],
  "inStock": true,
  "featured": true,
  "newArrival": true
}
```

### Stores
```json
{
  "id": 1,
  "name": "DELHI STORE",
  "address": "Store address",
  "phone": "+91 9599191998",
  "city": "Delhi",
  "coordinates": { "lat": 28.5275, "lng": 77.2519 },
  "hours": { "monday": "11:00 AM - 9:00 PM" }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Security

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **Input Validation**: Request validation
- **Compression**: Response compression

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## Deployment

The backend can be deployed to various platforms:

- **Heroku**: Connect GitHub repository
- **Railway**: Deploy from GitHub
- **Vercel**: Serverless deployment
- **AWS EC2**: Traditional server deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the BLUORNG e-commerce platform.

## Support

For support or questions, please contact the development team. 