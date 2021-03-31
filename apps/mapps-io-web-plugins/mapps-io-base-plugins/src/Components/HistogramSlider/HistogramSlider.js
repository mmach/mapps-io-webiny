import { debounce } from "@material-ui/core";
import * as React from "react";
import Rheostat from "rheostat";
import Histogram from "./Histogram/Histogram.js";
import "./style.scss";

class HistogramSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [this.props.value[0], this.props.value[1]]
        };
        this.timeout = 0;
        this.debounce = debounce((req) => {
            this.props.onMove && this.props.onMove(req);
        }, 100);
    }

    /*componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }*/

    reset(e) {
        e.preventDefault();
        this.setState({ value: [this.props.min, this.props.max] }, () => {
            if (typeof this.props.onApply === "function") {
                this.props.onApply(this.state.value);
            } else if (typeof this.props.onChange === "function") {
                this.props.onChange(this.state.value);
            }
        });
    }

    isDisabled() {
        return this.state.value[0] === this.props.min && this.state.value[1] === this.props.max;
    }

    handleSliderChange(value) {
        this.setState({ value: value.values });
        this.debounce(value.values);
        //this.props.onMove && this.props.onMove(value.values);
        //this.props.onChange(value.values);
        /*
        if (typeof this.props.onChange === 'function') {
          if (this.timeout) {
            window.clearTimeout(this.timeout);
          }
          this.timeout = window.setTimeout(() => {
            //@ts-ignore: has been checked outsite
            this.props.onChange(value);
          }, this.props.debounceDelay || 500);
        }*/
    }
    onSliderDragEnd() {
        this.props.onChange(this.state.value);
    }
    handleApply(e) {
        e.preventDefault();
        if (typeof this.props.onApply === "function") {
            this.props.onApply(this.state.value);
        }
    }

    render() {
        if (this.props.min >= this.props.max) {
            return null;
        }

        if (this.props.value[0] >= this.props.value[1]) {
            return null;
        }

        const isDisabled = this.isDisabled();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, ...rangeSliderProps } = this.props;
        let dataCube = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dataMean = [];
        //let divVal = Math.round(this.props.data.length / (this.props.cubeSize > 0 ? this.props.cubeSize : 50))
        //this.props.data.forEach((element, index) => {
        /* if (index % divVal == 0) {
       let val = 0;
       dataMean.forEach(item => {
         val += item
       })
       dataCube.push(parseFloat(val) * parseFloat(divVal) / 100.0)
       dataMean = []
     } else {
       dataMean.push(element);
     }

   })*/
        dataCube = this.props.data.map((item) => {
            return Math.round(item);
        });
        return (
            <div
                style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    boxSizing: "border-box",
                    heigth: "30px",
                    position: "relative"
                }}
            >
                <Histogram
                    maxHeightPx="40"
                    colors={this.props.colors}
                    data={dataCube}
                    value={this.state.value}
                    min={this.props.min}
                    max={this.props.max}
                />
                <div>
                    <Rheostat
                        onSliderDragEnd={this.onSliderDragEnd.bind(this)}
                        min={this.props.min}
                        max={this.props.max}
                        onValuesUpdated={this.handleSliderChange.bind(this)}
                        values={[this.state.value[0], this.state.value[1]]}
                    />
                </div>
                <div className={{ marginTop: "20px" }}>
                    <div
                        style={{
                            marginBottom: "10px",
                            fontSize: "12px",
                            color: "#666666"
                        }}
                    >
                        {this.props.label}
                    </div>

                    {typeof this.props.onApply === "function" && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: isDisabled ? "flex-end" : "space-between"
                            }}
                        >
                            {!isDisabled && (
                                <button onClick={this.reset} disabled={isDisabled}>
                                    Reset
                                </button>
                            )}
                            <button onClick={this.handleApply.bind(this)}>Apply</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default React.memo(HistogramSlider);
