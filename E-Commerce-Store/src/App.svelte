<script>
  import ProductDetailView from "./components/product/ProductDetailView.svelte";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import { Route, Router } from "svelte-routing";
</script>


<Router >
  <Header/>
  <Route path="/" component={Home}/>
  <Route path="/:id" component={ProductDetailView}/>
</Router>