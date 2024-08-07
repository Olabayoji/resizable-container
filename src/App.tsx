import ResizeableContainer from "./components/ResizeableContainer";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <ResizeableContainer
        direction="right"
        minSize={24}
        maxSize={500}
        boundSize={300}
        storageKey="resizeable-container"
        toggleKey="["
      >
        <div className={styles.container}>Hello world</div>
      </ResizeableContainer>
    </>
  );
}

export default App;
