import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />
          {selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Выберите дату"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          disabled={(date) => date > new Date()}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date as Date)}
        />
      </PopoverContent>
    </Popover>
  );
}
