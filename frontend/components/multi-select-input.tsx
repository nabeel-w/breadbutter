"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface MultiSelectInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  suggestions?: string[]
  label?: string | React.ReactNode
}

export function MultiSelectInput({
  value,
  onChange,
  placeholder = "Add item...",
  suggestions = [],
  label,
}: MultiSelectInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const addItem = (item: string) => {
    if (item.trim() && !value.includes(item.trim())) {
      onChange([...value, item.trim()])
      setInputValue("")
      setShowSuggestions(false)
    }
  }

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(suggestion),
  )

  return (
    <div className="space-y-2">
      {label && typeof label === "string" ? (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      ) : (
        label
      )}

      {/* Selected items */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <Badge key={index} className="bg-purple-600/20 text-purple-300 border-purple-600/30 pr-1">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-purple-600/30"
                onClick={() => removeItem(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input field */}
      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addItem(inputValue)
              }
            }}
            placeholder={placeholder}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            onFocus={() => setShowSuggestions(true)}
          />
          <Button
            type="button"
            onClick={() => addItem(inputValue)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => addItem(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
