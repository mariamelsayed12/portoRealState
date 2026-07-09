import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { PropertyUnitCardData } from "../interfaces/index";
import UnitCard from "../components/UnitCard";


const FavoritesPage = () => {
  const {favUnite } = useSelector((state: RootState) => state.favUnit);
  if (!favUnite.length) {
    return "not found units";
}
    return (
        <div>
            {
                favUnite.map((unit: PropertyUnitCardData) => (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-stretch">
                       <UnitCard card={unit} key={unit.id}/>
                    </div>
                ))
            }
        </div>
    );
};

export default FavoritesPage;