
const Categories = ({category, categoryName, categoryImage}) => {
  return (
    <div>
        <a href={`/category/${categoryName}`}>
          <div className="category-box">
            <div className="category-top">
            <div className="category-text">{category}</div>
            </div>
            <img src={`${categoryImage}`} alt={category} />
          </div>
        </a>
    </div>
  )
}

export default Categories


