const SideBySide = ({ left, right }) => (
	<div className='row'>
        <div className="col-md-6 side">
            <div style={{height: '100%'}}>{left}</div>
        </div>

        <div className="col-md-6 side">
            <div style={{height: '100%'}}>{right}</div>
        </div>
    </div>
);

export default SideBySide;
