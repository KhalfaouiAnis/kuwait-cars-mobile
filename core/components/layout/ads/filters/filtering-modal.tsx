import AppModal from '@/core/components/ui/dialog/modal';
import useFilteringStore from '@/core/lib/stores/sorting-filtering.store';
import { FilterAdsBy } from '@/core/types';
import Reset from '../reset';

interface FilteringModalProps {
    visible: boolean;
    onClose: () => void;
    filterType: FilterAdsBy
    renderFilter: (selectedValues: (string | number)[], onToggle: (value: string | number) => void) => React.ReactNode;
}

const FilteringModal: React.FC<FilteringModalProps> = ({
    visible,
    onClose,
    filterType,
    renderFilter,
}) => {
    const { [filterType]: selectedValues, toggleFilter, clearFilter } = useFilteringStore();

    const handleToggle = (value: string | number) => toggleFilter(filterType, value);

    return (
        <AppModal
            visible={visible}
            onClose={onClose}
            header={<Reset reset={() => clearFilter(filterType)} />}
            renderContent={() => renderFilter(selectedValues, handleToggle)}
        />
    );
};

export default FilteringModal;