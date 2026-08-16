import { LiveSearchComponent, LIVE_SEARCH_META } from './live-search/live-search.component';
import { FastNavigationComponent, FAST_NAVIGATION_META } from './fast-navigation/fast-navigation.component';
import { FormSubmitComponent, FORM_SUBMIT_META } from './form-submit/form-submit.component';
import {
  ParallelRequestsComponent,
  PARALLEL_REQUESTS_META,
} from './parallel-requests/parallel-requests.component';
import {
  LoadingDataErrorComponent,
  LOADING_DATA_ERROR_META,
} from './loading-data-error/loading-data-error.component';
import { FiltersUrlComponent, FILTERS_URL_META } from './filters-url/filters-url.component';
import {
  SubscriptionLeakComponent,
  SUBSCRIPTION_LEAK_META,
} from './subscription-leak/subscription-leak.component';
import { ConfigCacheComponent, CONFIG_CACHE_META } from './config-cache/config-cache.component';
import { ScenarioDescriptor } from './scenario.model';

/**
 * Реестр всех сценариев. Порядок — порядок в сайдбаре.
 * Чтобы добавить новый сценарий:
 *   1) создать папку в `scenarios/`
 *   2) экспортировать META + Component
 *   3) дописать сюда
 */
export const SCENARIOS: ReadonlyArray<ScenarioDescriptor> = [
  { meta: LIVE_SEARCH_META, component: LiveSearchComponent },
  { meta: FAST_NAVIGATION_META, component: FastNavigationComponent },
  { meta: FORM_SUBMIT_META, component: FormSubmitComponent },
  { meta: PARALLEL_REQUESTS_META, component: ParallelRequestsComponent },
  { meta: LOADING_DATA_ERROR_META, component: LoadingDataErrorComponent },
  { meta: FILTERS_URL_META, component: FiltersUrlComponent },
  { meta: SUBSCRIPTION_LEAK_META, component: SubscriptionLeakComponent },
  { meta: CONFIG_CACHE_META, component: ConfigCacheComponent },
];
