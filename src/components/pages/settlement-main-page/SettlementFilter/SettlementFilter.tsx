import {
  FilterToggleItem,
  FilterToggleRoot,
} from "@/components/common/FilterToggle";
import type { SettlementFilterType } from "@/pages/SettlementPage/SettlementListPage/useSettlementList";

interface Props {
  filter: SettlementFilterType;
  setFilter: (filter: SettlementFilterType) => void;
}
export default function SettlementFilter({ filter, setFilter }: Props) {
  return (
    <FilterToggleRoot
      type="single"
      value={filter}
      onValueChange={(value) => setFilter(value as SettlementFilterType)}
    >
      <FilterToggleItem value="pending">미완료</FilterToggleItem>
      <FilterToggleItem value="completed">완료</FilterToggleItem>
    </FilterToggleRoot>
  );
}
