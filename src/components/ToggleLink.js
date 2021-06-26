import { Link } from 'react-router-dom';

const ToggleLink = ({ to, title, page}) => {

    if (page == "DISABLED") {
        return (
            <span className="disabled-link">
                {title}
            </span>
        )
    } else if (title != page) {
        return (
            <Link to={to} className="unfocused" >
                {title}
            </Link>
        )
    } else {
        return (
            <span className="subpage-header">
		{title}
	    </span>
	)
    }
}

export default ToggleLink;
