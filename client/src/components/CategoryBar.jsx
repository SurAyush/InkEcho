import React from 'react'
import {post_categories} from "../data.js"
import {Link} from 'react-router-dom'

const CategoryBar = () => {
  return (
    <div className="cat">
        {post_categories.map((category)=>{
            return <div key={category} className="cat-item"><Link reloadDocument to={`posts/category/${category}`}>{category}</Link></div>
        })}
    </div>
  )
}

export default CategoryBar