import "./informationPanel.scss";
import FilterPanel from "../FilterPanel/FilterPanel";

const InformationPanel = (props) => {
    return(
        <div className="information-panel">
            <p className="information-panel__numbers">{props.list.length} items left</p>
            <FilterPanel onFilterSelect={props.onFilterSelect}/>
            <p className="information-panel__clear-completed">Clear completed</p>
        </div>
    );
};

export default InformationPanel;