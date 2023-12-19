

import React, { useContext, useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import axios from "axios"
import "./angel.css"
import "../catalog-logo.png"

const CatContext = React.createContext();

export const CatsContextProvider = ({ children }) => {
    const [catPictures, setCatPictures] = useState([]);
  
    return (
      <CatContext.Provider value={{ catPictures, setCatPictures }}>
        {children}
      </CatContext.Provider>
    );
  };
  
  export const useCats = () => useContext(CatContext);
  

const Angel = () => {
    const {catPictures, setCatPictures} = useCats()
    const [text, setText] = useState("")
    const [tags, setTags] = useState ([""])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    useEffect ( () => {
        axios.get("https://cataas.com/api/tags?json=true", {
            "headers": {
                "content-type": "application/json"
            }
        })
        .then( (response) => {
            setTags(response.data)
        })
        .catch( (error) => {
            console.log("error ", error)
        });
    }, [])
    const handleInput = (e) => {
        console.log("value ", e.target.value)
        setText(e.target.value)
        
    }

    const findCat = () => {
        // make an axios call here
        let source = ""
        if (text && value ) {
            // api for text and tag
            source = "https://cataas.com/cat/" + value + "/says/" + text + "?json=true"
        } else if (text && !value) {
            source = "https://cataas.com/cat/says/" + text + "?json=true"
            // api for only text
        } else if (!text && value) {
            // api for only tag
            source = "https://cataas.com/cat/" + value + "?json=true"
        } else {
            // api for none
            source = "https://cataas.com/cat?json=true"
        }
        axios.get(source, {
            "headers": {
                "content-type": "application/json"
            }
        })
        .then( (response) => {
            // let catPicturesTemp = catPictures
            // catPicturesTemp.push(response.data)
            // setCatPictures(catPicturesTemp)
            setCatPictures(catPictures => ([...catPictures, response.data]));
        })
        .catch( (error) => {
            console.log("error ", error)
        });
    }
    return (
        <div className="col-span-10 mt-10">
            <div className="grid grid-cols-10">
                <div className="col-span-10">
                    <div>
                        <img className="w-80 h-auto inline" src="catalog-logo.png"/>
                    </div>
                    <div className="px-8 py-5 bg-[#D2AC92] w-96 mt-5 inline-block">
                        <div className="mt-5">
                            <Input placeholder="Cat says..." className="bg-[#fff]" onInput={handleInput} value={text}/>
                        </div>
                        <div className="mt-5">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between w-full bg-[#fff] hover:bg-[#fff]"
                                >
                                {value
                                    ? value
                                    : "Select tag..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0 bg-[#fff] hover:bg-[#fff]">
                                <Command>
                                <CommandInput placeholder="Search tag..." />
                                <CommandEmpty>No tag found.</CommandEmpty>
                                <CommandGroup
                                    className="overflow-y-auto h-52"
                                >
                                    {tags.map((tag, index) => (
                                    <CommandItem
                                        key={index}
                                        value={tag}
                                        onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        }}
                                    >
                                        <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === tag ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {tag}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                                </Command>
                            </PopoverContent>
                            </Popover>
                        </div>
                        <div className="mt-3">
                            <Button className="bg-[#7A5D58] text-color-white" variant="primary" onClick={findCat}>Find a Cat</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-5">
            {
                catPictures && catPictures.length > 0 && catPictures.map( (value, index) => {
                    return (
                        <div className={"col-span-3 mt-5 animate flip" } key ={index}>
                            <Link to={"/detail?id=" + value._id}>
                                <img className={"h-80 w-full border-red-500 " + (index % 2 === 0 ? " border-x-8": " border-y-8") } src = {"https://cataas.com/cat/" + value._id}/>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Angel