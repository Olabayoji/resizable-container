import styles from "./App.module.scss";
import ResizableContainer from "./components/ResizableContainer";

function App() {
  return (
    <div className={styles.outerContainer}>
      <ResizableContainer
        direction="right"
        minSize={0}
        maxSize={400}
        boundSize={200}
        storageKey="resizable-container"
        toggleKey="["
        containerClassName={styles.containerTest}
        childrenWrapperClassName={styles.childrenWrapper}
      >
        <div className={styles.container}>test</div>
      </ResizableContainer>
    </div>
  );
}

export default App;
