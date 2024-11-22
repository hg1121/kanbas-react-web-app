export default function House() {
    const house = {
      bedrooms: 4,
      bathrooms: 2.5,
      squareFeet: 2000,
      address: {
        street: "Via Roma",
        city: "Roma",
        state: "RM",
        zip: "00100",
        country: "Italy",
      },
      owners: ["Alice", "Bob"],
    };

    console.log(house);

    function replacer(key: string, value: any) {
        // Filtering out properties
        if (typeof value === "string") {
          return undefined;
        }
        return value;
      }
      
      const foo = {
        foundation: "Mozilla",
        model: "box",
        week: 45,
        transport: "car",
        month: 7,
      };

      let res = JSON.stringify(foo, replacer)
      
    return (
      <div id="wd-house">
        <h4>House</h4>
        <h5>bedrooms</h5>
        {house.bedrooms}
        <h5>bathrooms</h5>
        {house.bathrooms}
        <h5>Data</h5>
        <pre>{JSON.stringify(house, null, 2)}</pre>
        <pre>{res};</pre>
        <hr />
      </div>
    );
  }
  
  