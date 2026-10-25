<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep signed-in fitness screens under the managed `_authenticated` layout at named URLs; this avoids duplicate home routes and keeps protected loaders behind the session gate.
- Use authenticated server functions and row-level policies for portal reads and writes; company HR access must never be granted by browser state.
- Keep date validation and date-window progress calculations in client-safe portal modules with tests so journal and dashboard totals stay consistent.
