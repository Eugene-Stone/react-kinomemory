import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../context/AuthContext/useAuth';
import { useOutletContext } from 'react-router-dom';
import './AddFilm.scss';

import { UserType } from '../../types/UserType';
import { Film, AddFilmForm } from '../../types/Film';

type OutletContextType = {
	addFilm: (user: UserType | null, dataFilm: AddFilmForm) => Promise<boolean>;
};

export default function AddFilm() {
	const [status, setStatus] = useState('');
	const { user } = useAuth();
	const { addFilm } = useOutletContext<OutletContextType>();
	// console.log(addFilm);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<AddFilmForm>({
		mode: 'onSubmit',
	});

	async function onSubmit(data: AddFilmForm) {
		setStatus('loading');

		const success = await addFilm(user, data);
		if (success) {
			setStatus('success');
			setTimeout(() => {
				reset();
			}, 1000);
		} else {
			setStatus('error');
		}
	}

	return (
		<>
			<h2 className="cabinet-title">Add new movie</h2>

			<div className="admin-tools">
				<form className="add-movie-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<input
							{...register('title', { required: 'Field required' })}
							type="text"
							placeholder="Title"
						/>
						{errors.title && (
							<div className="error-field">
								{errors.title.message || 'Field is required.'}
							</div>
						)}
					</div>
					<div className="form-group">
						<input
							{...register('rating', { required: 'Field required' })}
							type="number"
							step="0.1"
							placeholder="Rating"
						/>
						{errors.rating && (
							<div className="error-field">
								{errors.rating.message || 'Field is required.'}
							</div>
						)}
					</div>
					<div className="form-group">
						<input
							{...register('genre', { required: 'Field required' })}
							type="text"
							placeholder="Genre"
						/>
						{errors.genre && (
							<div className="error-field">
								{errors.genre.message || 'Field is required.'}
							</div>
						)}
					</div>
					<div className="form-group">
						<input
							{...register('poster', { required: 'Field required' })}
							type="url"
							placeholder="Poster URL"
						/>
						{errors.poster && (
							<div className="error-field">
								{errors.poster.message || 'Field is required.'}
							</div>
						)}
					</div>
					<div className="form-group">
						<input
							{...register('trailer', { required: 'Field required' })}
							type="url"
							placeholder="Trailer URL"
						/>
						{errors.trailer && (
							<div className="error-field">
								{errors.trailer.message || 'Field is required.'}
							</div>
						)}
					</div>
					<div className="form-group">
						<textarea
							{...register('description', { required: 'Field required' })}
							placeholder="Description"
							defaultValue={''}
						/>
						{errors.description && (
							<div className="error-field">
								{errors.description.message || 'Field is required.'}
							</div>
						)}
					</div>
					<button type="submit" className="btn-submit">
						Publish
					</button>

					<div className="error-field center" style={{ color: '#ccc' }}>
						Все поля обязательны
					</div>

					<div className="center">
						{status === 'success' && <p className="success">Success</p>}
						{status === 'error' && <p className="error">Error</p>}
					</div>
				</form>
			</div>
		</>
	);
}
