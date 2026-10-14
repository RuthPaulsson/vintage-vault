export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      Oops! The vault is jammed. {message}. Please try again later.
    </p>
  );
}
