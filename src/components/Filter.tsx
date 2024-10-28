import { FaCheck } from "react-icons/fa";

interface FiltersProps {
  type: boolean;
  area:Array<number>;
  minPrice: number;
  maxPrice: number;
  setType: (type: boolean) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  priceFilter: Array<number>;
  setPriceFilter: (filter: [number, number]) => void;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters = ({ setPriceFilter,area, minPrice, maxPrice, type, setType, statusFilter, setStatusFilter, priceFilter, handleMinChange, handleMaxChange }:FiltersProps) => {
  return (
    <div className='box '>
    <div className='box-filtering'>
      <button onClick={() => setType(true)} style={{ backgroundColor: '#ffffff00', color: `${type ? 'white' : '#757575'}`, border: 'none', cursor: 'pointer', fontWeight: '500' }}>
        <span style={{ display: 'block', height: '1rem' }}>{type && '-'} </span>
        Type
      </button>
      <button onClick={() => setType(false)} style={{ backgroundColor: '#ffffff00', color: `${type ? '#757575' : 'white'}`, border: 'none', cursor: 'pointer', fontWeight: '500' }}>
        <span style={{ display: 'block', height: '1rem' }}>{!type && '-'} </span>
        Availability
      </button>
    </div>

    {
      type ? <div className="colored-box" style={{ borderRadius: '0.4rem' }}>
        <div style={{ backgroundColor: '#23e282' }}><span>Commercial  </span></div>
        <div style={{ backgroundColor: '#cc8b2a' }}><span>Administrative</span></div>
        <div style={{ backgroundColor: '#2673d6' }}><span>Clinical</span></div>
      </div> : <div onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        const text = e.target as HTMLElement;
        setStatusFilter(text.innerText);
        setPriceFilter([minPrice, maxPrice])
      }} className="colored-box" style={{ borderRadius: '0.4rem' }}>
        <div style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black' }}><span> {statusFilter === 'Show All' ? <FaCheck style={{ margin: '2px 6px 0px 4px' }} /> : ''}Show All  </span></div>
        <div style={{ cursor: 'pointer', backgroundColor: '#47a824' }}><span>{statusFilter === 'Available' ? <FaCheck style={{ margin: '2px 6px 0px 4px' }} /> : ''}Available  </span></div>
        <div style={{ cursor: 'pointer', backgroundColor: 'chocolate' }}><span>{statusFilter === 'Reserved' ? <FaCheck style={{ margin: '2px 6px 0px 4px' }} /> : ''}Reserved</span></div>
        <div style={{ cursor: 'pointer', backgroundColor: 'red' }}><span>{statusFilter === 'Sold' ? <FaCheck style={{ margin: '2px 6px 0px 4px' }} /> : ''}Sold</span></div>
      </div>
    }

    <label style={{ color: 'white', fontSize: '0.75rem' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: '0.5rem' }}>
        <div>
          <span> Area</span>
        </div>
        <div>

          <span> {area[0]}</span> - <span>{area[1]}Sq.m</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className='ranges' style={{ width: '100%', display: 'flex', marginTop: '0.3rem' }}>
          <input
            style={{ position: 'relative', zIndex: '1' }}
            type="range"
            min="0"
            max="50"
            step="10"
            defaultValue={0}
          />
          <input
            style={{ position: 'relative', marginLeft: '-0.5rem', zIndex: '0' }}

            type="range"
            min="60"
            max="120"
            step="10"
            defaultValue={120}
          />
        </div>

      </div>
    </label>

    <label style={{ color: 'white', fontSize: '0.75rem' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: '0.5rem' }}>
        <div>
          <span> Price</span>
        </div>
        <div>

          <span>EGP{priceFilter[0]}</span> - <span>{priceFilter[1]}EGP</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className='ranges' style={{ width: '100%', display: 'flex', marginTop: '0.3rem' }}>
          <input
            style={{ position: 'relative', zIndex: '1' }}
            type="range"
            min={`${minPrice}`}
            max={`${priceFilter[1] / 2}`}
            step="1000"
            value={priceFilter[0]}
            onChange={handleMinChange}
          />
          <input
            style={{ position: 'relative', marginLeft: '-0.5rem', zIndex: '0' }}

            type="range"
            min="0"
            max={`${maxPrice}`}
            step="1000"
            value={priceFilter[1]}
            onChange={handleMaxChange}
          />
        </div>

      </div>
    </label>

  </div>
  );
};

export default Filters;
