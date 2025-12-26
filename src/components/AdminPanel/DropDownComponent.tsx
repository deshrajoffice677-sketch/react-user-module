import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@radix-ui/react-dropdown-menu';

type DropdownProps = {
  label: string;
  value: string;
  setValue: (value: any) => void;
  list: string[];
};

function DropDownComponent({ label, value, setValue, list }: DropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-2xl">{label}</label>

      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary flex items-center justify-between w-[120px] rounded-lg px-3 py-2.5 border">
          <div className="flex gap-2 items-center">
            <p className="max-w-[10ch] truncate text-sm leading-none font-semibold">{value}</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="min-w-[160px] bg-white rounded-xl shadow-lg border p-1 z-50"
          >
            {list.map((v, i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer px-3 py-2 rounded-md text-sm hover:bg-gray-100"
                onClick={() => setValue(v)}
              >
                {v}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}

export default DropDownComponent;
