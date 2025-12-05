import React, { useState, useEffect, useRef } from 'react';
import { Material } from '../types';
import { Search } from 'lucide-react';

interface MatchcodeInputProps {
  materials: Material[];
  onSelect: (material: Material) => void;
}

export const MatchcodeInput: React.FC<MatchcodeInputProps> = ({ materials, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Material[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const lowerValue = value.toLowerCase();
      const filtered = materials.filter(m => 
        m.description.toLowerCase().includes(lowerValue) ||
        m.codeDat.toLowerCase().includes(lowerValue) ||
        m.codeSap.toLowerCase().includes(lowerValue)
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (material: Material) => {
    onSelect(material);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amazonas-green focus:border-transparent outline-none transition-colors"
          placeholder="Digite o nome do material, código DAT ou SAP..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" size={18} />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((material) => (
            <li
              key={material.id}
              onClick={() => handleSelect(material)}
              className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-center group"
            >
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-amazonas-green dark:group-hover:text-green-400">
                  {material.description}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  DAT: {material.codeDat} | SAP: {material.codeSap} | Und: {material.unit}
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${material.currentStock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  Estoque: {material.currentStock}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {isOpen && suggestions.length === 0 && query.length > 1 && (
         <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
           Nenhum material encontrado.
         </div>
      )}
    </div>
  );
};