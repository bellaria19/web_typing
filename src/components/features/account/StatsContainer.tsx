import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownIcon,
} from "@/styles/account.styles";
import { useState } from "react";

export const StatsContainer = () => {
  const options = ["Total", "Month", "Week", "Today"];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Total");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selectedOption} <DropdownIcon />
      </DropdownButton>
      {dropdownOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
