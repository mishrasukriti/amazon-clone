import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import Product from '../models/categoryModel.js'

// @desc    Fetch all Categories
// @route   GET /api/Categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    console.log("inside getCategories ");
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        }
      }
    : {}

  const count = await Category.countDocuments({ ...keyword })
  const categories = await Category.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ categories, page, pages: Math.ceil(count / pageSize) })
})


// const catProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10
//   const page = Number(req.query.pageNumber) || 1

//   const keyword = req.query.keyword
//     ? {
//         category: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         }
//       }
//     : {}

//   const count = await Product.countDocuments({ ...keyword })
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))

//   res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })



// @desc    Fetch single Category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.remove()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: 'Sample name',
  })

  const createdCategory = await category.save()
  res.status(201).json(createdCategory)
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name

    const updatedCategory = await category.save();
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})



// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const product = await Product.findById(req.params.id)

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('Product already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     product.reviews.push(review)

//     product.numReviews = product.reviews.length

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length

//     await product.save()
//     res.status(201).json({ message: 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

// // @desc    Get top rated products
// // @route   GET /api/products/top
// // @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

//   res.json(products)
// })

export {
  getCategories,
  
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory
}
