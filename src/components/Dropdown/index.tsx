import { useState, useEffect, useRef, FC, useMemo } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { DropdownProps, Option } from '../../types/Dropdown.types';
import styles from './Dropdown.module.css';

const Dropdown: FC<DropdownProps> = ({
  options,
  defaultOption,
  onChange,
  placeholder = 'Select...',
  searchable = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) return;
    if (defaultOption) return setSelected(defaultOption);
    if (options.length > 0) {
      setSelected(options[0]);
    }
  }, [options, defaultOption, selected]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
    setQuery('');
  };

  const filteredOptions = useMemo(
    () => (searchable ? options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase())) : options),
    [options, query, searchable],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={ref}>
      <div
        className={styles.control}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen((prev) => !prev)}
      >
        {selected?.label || placeholder}
        {selected?.icon || (isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />)}
      </div>

      {isOpen && (
        <div className={styles.menu}>
          {searchable && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.search}
              placeholder="Search..."
              autoFocus
            />
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div key={option.key} className={styles.option} onClick={() => handleSelect(option)}>
                {option.label} {option.icon}
              </div>
            ))
          ) : (
            <div className={styles.noOptions}>No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
