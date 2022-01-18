import React, { MouseEvent } from 'react'

import styles from './Header.module.scss'

import logo from '../../Images/VULOJ_LOGO.png'
import { Link } from 'react-router-dom'
import { getClass } from '../../Utils/utils';

interface IHeaderProp {
	items: Array<{
		name: string,
		link: string
	}>
}

interface IHeaderState {
	selected: number,
	hovering: number,
}

class Header extends React.Component<IHeaderProp, IHeaderState> {
	constructor(props: IHeaderProp) {
		super(props);

		this.state = {
			selected: 0,
			hovering: -1
		}
	}

	handleMouseOver = (key: number) => (event: MouseEvent) => {
		event.preventDefault();

		this.setState({
			hovering: key
		});
	}

	handleMouseOut = (key: number) => (event: MouseEvent) => {
		event.preventDefault();

		this.setState({
			hovering: -1
		});
	}

	handleClick = (key: number) => (event: MouseEvent) => {
		event.preventDefault();

		this.setState({
			selected: key
		});
	}

	render() {
		const { selected, hovering } = this.state;

		return (
			<header className={styles['header']}>
				<div className={styles['header_wrapper']}>
					<div className={styles['header_logo']}>
						<img src={logo} alt="vuloj_logo" />
					</div>

					<div className={styles['header_tab']}>
						<ul className={styles['tabs']}>
							{
								this.props.items.map((value, index) => {
									return (
										<li
											key={index}
											className={
												getClass(styles, [
													{ name: 'header_item', require: true },
													{ name: 'header_item_active', require: index === hovering || index === selected }
												])
											}
											onMouseOver={this.handleMouseOver(index)}
											onMouseOut={this.handleMouseOut(index)}
											onClick={this.handleClick(index)}
										>
											<Link className={styles['header_tab_link']} to={value.link}>{value.name}</Link>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</header>
		)
	}
}

export default Header;