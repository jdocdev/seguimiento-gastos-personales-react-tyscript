import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

const FilterBy = () => {

  const {dispatch} = useBudget()

  const handleChange = (evento: ChangeEvent<HTMLSelectElement>)=>{
    dispatch({type:'add-filter-category', payload:{id:evento.target.value}})
  }

  return (
    <div className="card shadow-sm" style={{ width: "80rem" }}>
      <div className="card-body">
        <form>
          <div className="">
            <label htmlFor="filterCategory" className="form-label fw-semibold">
              Filtro por categría
            </label>
            <select
              id="filterCategory"
              name="filterCategory"
              className="form-select"
              onChange={handleChange}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBy;
