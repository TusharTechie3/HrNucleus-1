import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-blue/theme.css";
import StatesServices from "./States";

export default function StateAuto() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
    }, 250);
  };

  useEffect(() => {
    StatesServices.getCountries().then((data) => setCountries(data));
  }, []);

  return (
    <div className="card flex justify-content-center surface-900 ">
      <AutoComplete
        id="searchbar"
        field="name"
        value={selectedCountry}
        suggestions={filteredCountries}
        placeholder="Search"
        completeMethod={search}
        onChange={(e) => setSelectedCountry(e.value)}
      />
    </div>
  );
}
