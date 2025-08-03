const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newarrivalSchema = new Schema({
  product_code: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String,
  }],
  size1: {
    type: String
  }, 
  size2: {
    type: String
  },
  size3: {
    type: String
  },
  size4: {
    type: String
  },
  size5: {
    type: String
  },
  color1: {
    type: String
  },
  color2: {
    type: String
  },
  color3: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  gender: {
    type: String
  }, 
   category: {
    type: String
  },
    subcategory: {
    type: String,
    required: true,
  }, 
  childsubcategory: {
    type: String
  }, 
   product_status: {
    type: String
  },
    old_price: {
    type: String
  }, 
   new_price: {
    type: String
  }, 
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: Number
  },
  season: {
    type: String
  },
  fabrics: {
    type: String
  },
   reviews: {
    type: Array,
  }
 
},
{ 
  timestamps: true ,
}
);

newarrivalSchema.index({ gender: 1, category: 1, subcategory: 1, brand: 1, product_status: 1 });

module.exports = mongoose.model("newarrival", newarrivalSchema);