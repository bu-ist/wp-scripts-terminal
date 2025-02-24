/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, excerpt } = attributes;
	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
		console.log( title );
	};
	const onChangeExcerpt = ( newExcerpt ) => {
		setAttributes( { excerpt: newExcerpt } );
	};

	return (
		<div { ...useBlockProps() }>
			<div className="wp-block-bu-block-example-dynamic--container">
				<RichText
					className="wp-block-bu-block-example-dynamic--title"
					placeholder={ __( 'Callout Title', 'theme-slug' ) }
					tagName="h2"
					onChange={ onChangeTitle }
					value={ title }
					allowedFormats={ [] }
				/>
				<RichText
					placeholder={ __( 'Excerpt', 'theme-slug' ) }
					tagName="p"
					classname="wp-block-bu-block-example-dynamic--excerpt"
					onChange={ onChangeExcerpt }
					value={ excerpt }
					allowedFormats={ [
						'core/italic',
						'core/bold',
						'core/link',
					] }
				/>
			</div>
		</div>
	);
}
