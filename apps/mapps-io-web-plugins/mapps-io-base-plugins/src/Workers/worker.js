/* eslint-disable react/react-in-jsx-scope */
import { BuildItem } from "justshare-shared";

export async function ProcessItemWorker({ items, catOpt, pairs, dimensions, lang }) {
    //message - ping

    const result = JSON.parse(items).map((i) => {
        //return {};
        return BuildItem(i, catOpt, pairs, dimensions, lang);
    });

    return result;
}

export async function PreparePinsWorker({ grouping, items, categoriesReducer }) {
    //message - ping

    const arrayItems = [];
    const zoomGroup = 111110 / grouping;

    items.forEach((item) => {
        const lon =
            Math.ceil(
                (Math.round(item.longitude * zoomGroup) / zoomGroup) *
                    Math.pow(10, Math.round(zoomGroup).toString().length - 1)
            ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
        const lat =
            Math.ceil(
                (Math.round(item.latitude * zoomGroup) / zoomGroup) *
                    Math.pow(10, Math.round(zoomGroup).toString().length - 1)
            ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
        let array = arrayItems[lat + ":" + lon];
        if (array == undefined) {
            array = [];
        }
        array.push(item);
        arrayItems[lat + ":" + lon] = array;
    });
    const pins = [];

    Object.keys(arrayItems).map((items) => {
        if (arrayItems[items].length == 1) {
            const item = arrayItems[items][0];
            const category = categoriesReducer.filter((cat) => {
                return (
                    item.categories.filter((item_cat) => {
                        return item_cat.id == cat.id;
                    }).length > 0
                );
            })[0];

            const cat = item.itemCategoryOption.filter((category) => {
                return category.category_link
                    ? category.category_link.is_on_pin_map == null
                        ? category.category_link.catOption.is_on_pin_map
                        : category.category_link.is_on_pin_map
                    : false;
            })[0];

            pins.push({
                type: "PIN",
                data: {
                    latlon: [item.latitude, item.longitude],
                    latlonCenter: [item.latitude, item.longitude],
                    length: 0,
                    cat: cat,
                    category: category,
                    items: [item]
                }
            });
        } else if (arrayItems[items].length > 1) {
            const categories = [];
            arrayItems[items].forEach((item) => {
                const category = categoriesReducer.filter((cat) => {
                    return (
                        item.categories.filter((item_cat) => {
                            return item_cat.id == cat.id;
                        }).length > 0
                    );
                })[0];
                if (category) {
                    categories[category.id] = category;
                }
            });
            const degree = (2 * Math.PI) / Object.keys(categories).length;
            Object.keys(categories).forEach((key, index) => {
                const category = categories[key];
                const itemCategories = arrayItems[items].filter((item) => {
                    return (
                        item.categories.filter((item_cat) => {
                            return item_cat.id == category.id;
                        }).length > 0
                    );
                });
                const item = arrayItems[items][0];
                const lonA =
                    Math.ceil(
                        (Math.round(item.longitude * zoomGroup) / zoomGroup) *
                            Math.pow(10, Math.round(zoomGroup).toString().length - 1)
                    ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
                const latA =
                    Math.ceil(
                        (Math.round(item.latitude * zoomGroup) / zoomGroup) *
                            Math.pow(10, Math.round(zoomGroup).toString().length - 1)
                    ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
                const long =
                    lonA +
                    (Object.keys(categories).length > 1
                        ? ((Math.round(Math.cos(degree * (index + 1)) * 10) / 10) * 20) /
                          grouping /
                          zoomGroup
                        : 0);
                const lat =
                    latA +
                    (Object.keys(categories).length > 1
                        ? ((Math.round(Math.sin(degree * (index + 1)) * 10) / 10) * 20) /
                          grouping /
                          zoomGroup
                        : 0);

                const cat = undefined;


                const pointA = [latA, lonA];
                const pointB = [lat, long];
                const pointList = [pointA, pointB];
                /*preferCanvas={true} renderer={myRenderer}*/

                pins.push({
                    type: "POLYLINE",
                    data: {
                        smoothFactor: 1,
                        opacity: 0.5,
                        fillColor: "#666",
                        fillOpacity: 0.1,
                        radius: 10000,
                        strokeWidth: 1,
                        positions: pointList
                    }
                });
                pins.push({
                    type: "PIN",
                    data: {
                        latlon: pointB,
                        latlonCenter: pointA,
                        length: arrayItems[items].length,
                        cat: cat,
                        category: category,
                        items: itemCategories
                    }
                });
            });
        }
    });
    return pins;
}
