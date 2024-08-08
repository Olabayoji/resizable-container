import ResizeableContainer from "./components/ResizeableContainer";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.outerContainer}>
      <ResizeableContainer
        direction="right"
        minSize={0}
        maxSize={500}
        boundSize={300}
        storageKey="resizeable-container"
        toggleKey="["
      >
        <div className={styles.container}>Hello world</div>
      </ResizeableContainer>
    </div>
  );
}

export default App;
