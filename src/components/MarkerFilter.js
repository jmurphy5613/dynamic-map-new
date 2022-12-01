import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

export class MarkerFilter extends MapControl {
    constructor(props, context) {
        super(props);
    }

    createLeafletElement(opts) {
        const MarkerFilter = L.Control.extend({
            onAdd: (map) => {
                this.panelDiv = L.DomUtil.create("div", "markerFilter");
                this.panelDiv.classList.add(opts.className);
                this.panelDiv.classList.add("active");

                const className = opts.className;
                let type = className;

                if (className === "issue") {
                    type = "problem";
                } else if (className === "place") {
                    type = "special place";
                }

                this.panelDiv.setAttribute("title", "Hide " + type + "s");

                return this.panelDiv;
            },
        });
        return new MarkerFilter({ position: "bottomleft" });
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        this.leafletElement.addTo(map);
        const div = this.panelDiv;

        div.addEventListener("click", (ev) => {
            let active = true;
            if (div.classList.contains("active")) {
                div.classList.remove("active");
                div.setAttribute("title", div.title.replace("Hide", "Show"));
                active = false;
            } else {
                div.setAttribute("title", div.title.replace("Show", "Hide"));
                div.classList.add("active");
            }
            this.props.click(this.props.className, active);
        });
    }
}

export default withLeaflet(MarkerFilter);
