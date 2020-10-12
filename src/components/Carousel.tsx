import React = require("react");
import { module } from "../Utils";
import "../less/carousel.less"

interface ICarouselProps {
	autoSlide?: boolean
}

interface ICarouselState {
	activePanel: number
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState>{

	readonly AUTO_SLIDE_SECONDS = 10;
	private autoSlideTimer: number;

	constructor(props: ICarouselProps) {
		super(props);
		this.state = {
			activePanel: 0
		};
		this.refreshAutoSlideTimer();
	}

	componentWillUnmount() {
		if (this.props.autoSlide) {
			clearTimeout(this.autoSlideTimer);
		}
	}

	render() {
		const childrenToRender: React.ReactNodeArray = [];
		const childrenCount = React.Children.count(this.props.children);
		React.Children.forEach(this.props.children, (child, index) => {
			if (index == module(this.state.activePanel, childrenCount)) {
				childrenToRender.push(child);
			}
		});

		return (
			<div className="carousel">
				<div className="left-arrow" onClick={this.onLeftClick} title="Previous"><div className="arrow-icon">{"<"}</div></div>
				<div className="content">
					{childrenToRender}
				</div>
				<div className="right-arrow" onClick={this.onRightClick} title="Next"><div className="arrow-icon">{">"}</div></div>
			</div>
		);
	}

	private refreshAutoSlideTimer() {
		if (this.props.autoSlide) {
			clearTimeout(this.autoSlideTimer);
			this.autoSlideTimer = window.setTimeout(() => {
				this.goNext();
			}, this.AUTO_SLIDE_SECONDS * 1000);
		}
	}

	private onLeftClick = () => {
		this.goPrev();
	}

	private onRightClick = () => {
		this.goNext();
	}

	private goNext = () => {
		this.refreshAutoSlideTimer();
		this.setState({
			activePanel: this.state.activePanel + 1
		});
	}

	private goPrev = () => {
		this.refreshAutoSlideTimer();
		this.setState({
			activePanel: this.state.activePanel - 1
		});
	}

}

export class CarouselPanel extends React.Component<{}, {}>{
	render() {
		return (
			<div className="carousel-panel">
				{this.props.children}
			</div>
		);
	}
}
