import useSortingStore from '@/core/lib/stores/sorting-filtering.store';
import { FC, ReactNode } from 'react';
import AppModal from '../../../ui/dialog/modal';
import Reset from '../reset';

interface SortingModalProps {
    visible: boolean;
    onClose: () => void;
    renderFilter: (selectedValues: (string)[], onToggle: (value: string) => void) => ReactNode;
}

const SortingModal: FC<SortingModalProps> = ({
    visible,
    onClose,
    renderFilter,
}) => {
    const { ["sorting"]: selectedValues, toggleFilter, clearFilter } = useSortingStore();

    const handleToggle = (value: string) => {
        toggleFilter("sorting", value);
    };

    return (
        <AppModal
            visible={visible}
            onClose={onClose}
            header={<Reset reset={() => clearFilter("sorting")} />}
            renderContent={() => renderFilter(selectedValues, handleToggle)}
        />
    );
};

export default SortingModal;