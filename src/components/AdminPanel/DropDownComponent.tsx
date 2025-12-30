import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@radix-ui/react-dropdown-menu';

type DropdownProps = {
  value: string;
  setValue: (value: string) => void;
  list: string[];
};

function DropDownComponent({ value, setValue, list }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white hover:bg-gray-50 flex items-center justify-between w-[130px] rounded-lg px-3 py-2 border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20">
        <span className="truncate text-sm font-medium text-gray-700">{value}</span>
        <i className="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
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
  );
}

export default DropDownComponent;
