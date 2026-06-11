'use client';

import { useEffect, useState, useRef } from "react";
import ArrowDownSVG from "@/assets/icons/arrow-down.svg";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    z-index: 9999;

    &:first-child {
        margin-right: 15px;
    }
`;

type FilterOption<T> = {
    title: string;
    value: T;
};

interface FilterDropdownProps<T> {
    label?: string;
    selectedTitle: string;
    options: FilterOption<T>[];
    onSelect: (option: FilterOption<T>) => void;
    className?: string;
}

export default function FilterDropdown<T>({
    label,
    selectedTitle,
    options,
    onSelect,
    className = "categories"
}: FilterDropdownProps<T>) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const toggleDropdown = () => {
            const dialog = dialogRef.current;
    
            if (!dialog) return;
    
            dialog.open
                ? dialog.close()
                : dialog.show();
        };

    /// ---- Close dropdown on Click Outside
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                const dialog = dialogRef.current;
    
                if (
                    dialog?.open &&
                    !dialog.contains(e.target as Node)
                ) {
                    dialog.close();
                }
            };
    
            document.addEventListener("mousedown", handleClickOutside);
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);
        /// ----

    return (
        <Wrapper>
            {label && <label>{label}</label>}

            <button
                type="button"
                className="dialogButton"
                onClick={toggleDropdown}
            >
                <span>{selectedTitle}</span>
                <ArrowDownSVG />
            </button>

            <dialog ref={dialogRef}>
                {options.map(option => (
                    <button
                        key={option.title}
                        type="button"
                        onClick={() => {
                            onSelect(option);
                            dialogRef.current?.close();
                        }}
                    >
                        <span>{option.title}</span>
                    </button>
                ))}
            </dialog>

        </Wrapper>
    );
}