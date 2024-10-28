import { useState } from "react";
import { IStatus } from "../interface/IStatus";
import { polygons } from "../helper/polygonsSVG";

interface IProps {
    filterData: Array<IStatus> 
    priceFilter: Array<number> 
}
const Polygon = ({ filterData , priceFilter }: IProps) => {
    const [hoveredItem, setHoveredItem] = useState<IStatus>();
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const handleMouseEnter = (e: React.MouseEvent<SVGPolygonElement>, item: IStatus) => {
        const matchedItem = filterData.find(oneItem => 
            oneItem.code.toString() === item.code.toString() &&
            oneItem.price >= priceFilter[0] && 
            oneItem.price <= priceFilter[1]
        );
        setHoveredItem(matchedItem);
        setShowTooltip(true);
        setHoverPosition({ x: e.pageX, y: e.pageY });
    };

    const handleMouseLeave = () => setShowTooltip(false);

    const handleMouseMove = (e: React.MouseEvent<SVGPolygonElement>) => {
        setHoverPosition({ x: e.pageX, y: e.pageY });
    };

    return (
        <>
            <svg style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'contain' }}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3950.8 3950.8">
                {
                polygons.map(({ id, code, points, fill }) => (
                    <polygon
                        key={id}
                        id={id}
                        data-code={code}
                        points={points}
                        fill={fill}
                        className="polygon-item"
                        onMouseEnter={(e) => handleMouseEnter(e, { code, status: '', price: 0 })}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                ))
                }
            </svg>

            {showTooltip && hoveredItem && (
                <div style={{ position: 'absolute', top: `${hoverPosition.y - 130}px`, left: `${hoverPosition.x + 20}px` }} className="info-box">
                    <p>Status: 
                        <span style={{
                            backgroundColor: hoveredItem.status === 'available' ? '#47a824' : 
                                hoveredItem.status === 'reserved' ? 'chocolate' : 
                                hoveredItem.status === 'sold' ? 'red' : 'transparent',
                            padding: '0.2rem', borderRadius: '0.25rem', fontSize: '0.8rem',
                        }}>
                            {String(hoveredItem.status).charAt(0).toUpperCase() + String(hoveredItem.status).slice(1)}
                        </span>
                    </p>
                    <p>Code: <span>{hoveredItem.code}</span></p>
                    <p>Price: <span>{hoveredItem.price} EGP</span></p>
                    <div style={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', borderRadius: '0.7rem', marginBottom: '0.5rem' }}>
                        <p style={{ fontSize: '0.8rem', color: 'black', fontWeight: '500' }}>Callback</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Polygon;