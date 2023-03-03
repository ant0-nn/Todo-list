import "./filterPanel.scss";

const FilterPanel = (props) => {
    return(
        <div className="filter">
            <div className="filter__item" onClick={() => props.onFilterSelect("all")}>All</div>
            <div className="filter__item" onClick={() => props.onFilterSelect(false)}>Active</div>
            <div className="filter__item" onClick={() => props.onFilterSelect(true)}>Completed</div>
        </div>
    );
};

export default FilterPanel;