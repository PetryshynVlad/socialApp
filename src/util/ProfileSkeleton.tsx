import React from 'react';
import { withStyles, WithStyles, Paper, createStyles } from '@material-ui/core';

import NoImg from '../assets/blank-profile-picture-973460_1280.png';
import { LocationOn, Link, Cake } from '@material-ui/icons';

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
	paper: {
		padding: 20,
		background: '#330417b6'
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '75%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#862052'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	handle: {
		height: 20,
		backgroundColor: '#862052',
		width: 60,
		margin: '0 auto 7px auto'
	},
	fullLine: {
		height: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '100%',
		marginBottom: '10px'
	},
	halfLine: {
		height: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '50%',
		marginBottom: '10px'
	}
});

export const ProfileSkeleton: React.FC<Props> = ({ classes }) => (
	<Paper className={classes.paper}>
		<div className={classes.profile}>
			<div className='image-wrapper'>
				<img src={NoImg} alt='' className='profile-image' />
			</div>
			<hr />
			<div className='profile-details'>
				<div className={classes.handle} />
				<hr />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<hr />
				<div className={classes.fullLine} />
				<LocationOn color='primary' /> <span>Location</span>
				<hr />
				<Link color='primary' /> https:///slug.com
				<hr />
				<Cake color='primary' /> Cake Day
			</div>
		</div>
	</Paper>
);

export default withStyles(styles)(ProfileSkeleton);
