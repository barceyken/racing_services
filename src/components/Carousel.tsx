import React = require("react");
import { module } from "../Utils";
import { Swipeable, SwipeableOptions } from "react-swipeable";

import "../less/carousel.less"

interface ICarouselProps {
	autoSlide?: boolean
}

interface ICarouselState {
	activePanel: number
}

enum EMove {
	None,
	Prev,
	Next
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState>{

	readonly AUTO_SLIDE_SECONDS = 10;
	private autoSlideTimer: number;
	private containerEl: Element;
	private currentMove: EMove;

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

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		var width = this.containerEl.clientWidth;
		this.containerEl.scrollLeft = width;
		this.currentMove = EMove.None;
	}

	render() {
		const childrenToRender = this.getChildsToRender();
		const swipeHandlers: SwipeableOptions = {
			onSwipedLeft: this.onRightClick,
			onSwipedRight: this.onLeftClick,
			delta: 35
		};
		return (
			<Swipeable className="carousel" {...swipeHandlers}>
				<div className="left-arrow" onClick={this.onLeftClick} title="Previous"><div className="arrow-icon">{"<"}</div></div>
				<div className="content" ref={el => this.containerEl = el}>
					{childrenToRender}
				</div>
				<div className="right-arrow" onClick={this.onRightClick} title="Next"><div className="arrow-icon">{">"}</div></div>
			</Swipeable>
		);
	}

	private getChildsToRender(): React.ReactNodeArray {
		const childrenToRender: React.ReactNodeArray = [];
		const childrenCount = React.Children.count(this.props.children);
		let centralPanelIndex = this.state.activePanel;
		if (this.currentMove == EMove.Next) {
			centralPanelIndex = centralPanelIndex - 1;
		} else if (this.currentMove == EMove.Prev) {
			centralPanelIndex = centralPanelIndex + 1;
		}
		// Previous
		React.Children.forEach(this.props.children, (child, index) => {
			if (index == module(centralPanelIndex - 1, childrenCount)) {
				childrenToRender.push(child);
			}
		});
		// Current
		React.Children.forEach(this.props.children, (child, index) => {
			if (index == module(centralPanelIndex, childrenCount)) {
				childrenToRender.push(child);
			}
		});
		// Next
		React.Children.forEach(this.props.children, (child, index) => {
			if (index == module(centralPanelIndex + 1, childrenCount)) {
				childrenToRender.push(child);
			}
		});
		return childrenToRender;
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
		this.currentMove = EMove.Next;
		this.setState({
			activePanel: this.state.activePanel + 1
		});
		setTimeout(() => {
			this.containerEl.scroll({
				left: 9999,
				behavior: "smooth"
			});
		}, 0);
		this.refreshAutoSlideTimer();
	}

	private goPrev = () => {
		this.currentMove = EMove.Prev;
		this.setState({
			activePanel: this.state.activePanel - 1
		});
		setTimeout(() => {
			this.containerEl.scroll({
				left: 0,
				behavior: "smooth"
			});
		}, 0);
		this.refreshAutoSlideTimer();
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
