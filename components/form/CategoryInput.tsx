import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/categories";

function CategoryInput() {
  const name = "category";
  return (
    <div className="mb-2">
      <Label htmlFor={name}>{name}</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
            return <SelectItem value={item.label}>Light</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategoryInput;
