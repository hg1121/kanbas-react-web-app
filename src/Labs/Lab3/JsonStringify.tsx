export default function JsonStringify() {
    const squares = [1, 4, 16, 25, 36];
    const strings = ['1', '2', '3']
    return (
      <div className="wd-json-stringify">
        <h3>JSON Stringify</h3>
        squares = {JSON.stringify(squares)}
        {/* strings = {JSON.stringify(strings)} */}
        <hr />
      </div>
    );
  }
  
  